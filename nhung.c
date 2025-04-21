/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2025 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "fonts.h"
#include "SH1106.h"
#include "tm_stm32f4_mfrc522.h"
#include <stdio.h>

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
I2C_HandleTypeDef hi2c3;

SPI_HandleTypeDef hspi4;

UART_HandleTypeDef huart1;

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_I2C3_Init(void);
static void MX_SPI4_Init(void);
static void MX_USART1_UART_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
struct Time{
	uint8_t sec;
	uint8_t min;
	uint8_t hour;
	uint8_t weekday;
	uint8_t day;
	uint8_t month;
	uint8_t year;
};


#define MAX_LOGS 100
#define MAX_CARDS 10

#define MAX_LOGS 100
#define CARD_ID_LENGTH 5
#define NUM_VALID_CARDS 2


typedef struct {
    uint8_t cardID[5];
    struct Time time;
} LogEntry;

uint8_t authorizedCards[MAX_CARDS][5] = {
    {0xC3, 0x53, 0x3E, 0x25, 0x8B},
	{0xF3, 0xDB, 0x9E, 0x34, 0x82},
	{0x33, 0xD6, 0x15, 0x35, 0xC5},


};

LogEntry logs[MAX_LOGS];
uint8_t logIndex = 0;


uint8_t IsAuthorized(uint8_t cardID[5]) {
    for (int i = 0; i < MAX_CARDS; i++) {
        if (memcmp(cardID, authorizedCards[i], 5) == 0) return 1;
    }
    return 0;
}


void SaveLog(uint8_t cardID[5], struct Time time) {
    if (logIndex < MAX_LOGS) {
        memcpy(logs[logIndex].cardID, cardID, 5);
        logs[logIndex].time = time;
        logIndex++;
    }
}


void HandleUARTCommand(char *cmd) {
    if (strncmp(cmd, "SHOW_LOG", 8) == 0) {
        char buffer[64];
        for (int i = 0; i < logIndex; i++) {
            sprintf(buffer, "[%02d:%02d:%02d] UID: %02X%02X%02X%02X%02X\r\n",
                    logs[i].time.hour, logs[i].time.min, logs[i].time.sec,
                    logs[i].cardID[0], logs[i].cardID[1], logs[i].cardID[2], logs[i].cardID[3], logs[i].cardID[4]);
            HAL_UART_Transmit(&huart1, (uint8_t*)buffer, strlen(buffer), 1000);
        }
    }
    else if (strncmp(cmd, "ADD_CARD ", 9) == 0) {
        // Parse UID và thêm vào authorizedCards (tuỳ theo yêu cầu)
    }
    else if (strncmp(cmd, "CLEAR_LOG", 9) == 0) {
        logIndex = 0;
        HAL_UART_Transmit(&huart1, (uint8_t*)"Logs cleared\r\n", 14, 1000);
    }
}


uint8_t DecimalToBCD(uint8_t val) {
    return ((val / 10) << 4) | (val % 10);
}

uint8_t BCDToDecimal(uint8_t val) {
    return ((val >> 4) * 10) + (val & 0x0F);
}


void SetTime(struct Time *time) {
	uint8_t data[7];
	data[0] = DecimalToBCD(time->sec);
	data[1] = DecimalToBCD(time->min);
	data[2] = DecimalToBCD(time->hour);
	data[3] = DecimalToBCD(time->weekday);
	data[4] = DecimalToBCD(time->day);
	data[5] = DecimalToBCD(time->month);
	data[6] = DecimalToBCD(time->year);
	HAL_I2C_Mem_Write(&hi2c3, 0xD0, 0, 1, data, 7, 1000);
}

void GetTime(struct Time *time) {
	uint8_t data[7];
	HAL_I2C_Mem_Read(&hi2c3, 0xD0, 0, 1, data, 7, 1000);
	time->sec = BCDToDecimal(data[0]);
	time->min = BCDToDecimal(data[1]);
	time->hour = BCDToDecimal(data[2]);
	time->weekday = BCDToDecimal(data[3]);
	time->day = BCDToDecimal(data[4]);
	time->month = BCDToDecimal(data[5]);
	time->year = BCDToDecimal(data[6]);
}



void TestDS1307()
{
	char buff[30];
	struct Time Set_time, Get_Time;
	Set_time.sec = 10;
	Set_time.min = 30;
	Set_time.hour = 14;
	Set_time.day = 17;
	Set_time.month = 4;
	Set_time.year = 25;
	Set_time.weekday = 0;
	//write time to DS1307
	HAL_I2C_Mem_Write(&hi2c3, 0xD0, 0, 1, (uint8_t *)&Set_time, 7, 1000);
	while (1) {
	//read time back
		HAL_I2C_Mem_Read(&hi2c3, 0xD1, 0, 1, (uint8_t *)&Get_Time, 7, 1000);
		sprintf(buff,"%02d:%02d:%02d-%02d-%02d/%02d/%02d \n",
			Get_Time.hour,
			Get_Time.min,
			Get_Time.sec,
			Get_Time.weekday,
			Get_Time.day,
			Get_Time.month,
			Get_Time.year);
		HAL_UART_Transmit(&huart1, buff, strlen(buff), 1000);
		HAL_Delay(500);
	}
}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_I2C3_Init();

  char buf[100];
  uint8_t X = 0, Y = 0;
  SH1106_Init ();
  sprintf (buf, "%s", "RC522 RFID");
  SH1106_GotoXY (12,10); // goto 10, 10
  SH1106_Puts(buf, &Font_11x18, 1);
  SH1106_UpdateScreen(); // update screen
  HAL_Delay(1000);

  MX_SPI4_Init();
  MX_USART1_UART_Init();
  /* USER CODE BEGIN 2 */
  	struct Time setTime = {10, 30, 14, 4, 17, 4, 25}; // Thứ Tư, ngày 17/04/2025, 14:30:10
    struct Time getTime;
    char buff[64];

    SH1106_Init();
    SH1106_GotoXY(12, 10);
    SH1106_Puts("DS1307 CLOCK", &Font_11x18, 1);
    SH1106_UpdateScreen();
    HAL_Delay(2000);
    SH1106_Fill(0); // Xoá màn hình

    // Chỉ gọi SetTime() lần đầu khi cần thiết, không nên gọi nhiều lần
    SetTime(&setTime);

    TM_MFRC522_Init();
    uint8_t CardID[5];
    struct Time currentTime;
    char screenBuffer[32];
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

	  // bài 1
	  	/*GetTime(&getTime);

	  	// Hiển thị lên UART
	  	sprintf(buff, "%02d:%02d:%02d - Th %d - %02d/%02d/20%02d\r\n",
	  	        getTime.hour, getTime.min, getTime.sec,
	  	        getTime.weekday, getTime.day, getTime.month, getTime.year);
	  	HAL_UART_Transmit(&huart1, (uint8_t *)buff, strlen(buff), 1000);

	  	// Hiển thị lên OLED SH1106
	  	SH1106_Fill(0); // Xoá màn hình cũ
	  	sprintf(buff, "%02d:%02d:%02d", getTime.hour, getTime.min, getTime.sec);
	  	SH1106_GotoXY(20, 10);
	  	SH1106_Puts(buff, &Font_11x18, 1);

	  	sprintf(buff, "%02d/%02d/20%02d", getTime.day, getTime.month, getTime.year);
	  	SH1106_GotoXY(20, 35);
	  	SH1106_Puts(buff, &Font_7x10, 1);

	  	SH1106_UpdateScreen();

	  	HAL_Delay(1000);*/

// bài 2
	  /*uint8_t CardID[5];
	  char buf[32];

	  HAL_Delay(100);

	  if (TM_MFRC522_Check(CardID) == MI_OK)
	  {
	      // Xóa màn hình
	      SH1106_Fill(0);

	      // Hiển thị dòng "Card Found" (Font lớn)
	      sprintf(buf, "Card Found");
	      uint8_t len = strlen(buf) * 11; // Font_11x18 có chiều rộng 11px
	      uint8_t x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 0);
	      SH1106_Puts(buf, &Font_11x18, 1);

	      // Hiển thị dòng UID (Font nhỏ)
	      sprintf(buf, "%02X %02X %02X %02X %02X",
	              CardID[0], CardID[1], CardID[2], CardID[3], CardID[4]);
	      len = strlen(buf) * 7; // Font_7x10 có chiều rộng 7px
	      x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 20); // dòng tiếp theo
	      SH1106_Puts(buf, &Font_7x10, 1);

	      SH1106_UpdateScreen();
	  }
	  else
	  {
	      SH1106_Fill(0);
	      sprintf(buf, "No Card");
	      uint8_t len = strlen(buf) * 11;
	      uint8_t x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 10);
	      SH1106_Puts(buf, &Font_11x18, 1);
	      SH1106_UpdateScreen();
	  }*/






	  // bài cuối
	  if (TM_MFRC522_Check(CardID) == MI_OK)
	  {
	      HAL_GPIO_WritePin(GPIOG, GPIO_PIN_13, GPIO_PIN_SET); // LED3 ON

	      GetTime(&currentTime);

	      uint8_t isAuthorized = IsAuthorized(CardID);
	      const char* statusMsg = isAuthorized ? "Welcome" : "Rejected";

	      if (isAuthorized)
	      {
	          HAL_GPIO_WritePin(GPIOG, GPIO_PIN_14, GPIO_PIN_SET); // LED4 ON
	          HAL_GPIO_WritePin(GPIOG, GPIO_PIN_13, GPIO_PIN_SET); // LED3 ON
	          SaveLog(CardID, currentTime);
	      }
	      else
	      {
	          HAL_GPIO_WritePin(GPIOG, GPIO_PIN_14, GPIO_PIN_RESET);
	          HAL_GPIO_WritePin(GPIOG, GPIO_PIN_13, GPIO_PIN_SET); // LED3 ON
	      }

	      SH1106_Fill(0);

	      // Dòng 1: Welcome / Rejected
	      sprintf(screenBuffer, "%s", statusMsg);
	      uint8_t len = strlen(screenBuffer) * 11; // Font_11x18 width
	      uint8_t x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 0);
	      SH1106_Puts(screenBuffer, &Font_11x18, 1);

	      // Dòng 2: UID thẻ
	      sprintf(screenBuffer, "%02X %02X %02X %02X %02X",
	              CardID[0], CardID[1], CardID[2], CardID[3], CardID[4]);
	      len = strlen(screenBuffer) * 7; // Font_7x10 width
	      x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 20);
	      SH1106_Puts(screenBuffer, &Font_7x10, 1);

	      // Dòng 3: Thời gian
	      sprintf(screenBuffer, "%02d:%02d:%02d %02d/%02d/20%02d",
	              currentTime.hour, currentTime.min, currentTime.sec,
	              currentTime.day, currentTime.month, currentTime.year);
	      len = strlen(screenBuffer) * 6;
	      x_pos = (128 - len) / 2;
	      SH1106_GotoXY(x_pos, 35);
	      SH1106_Puts(screenBuffer, &Font_7x10, 1);

	      SH1106_UpdateScreen();

	      // Chờ đến khi thẻ được rút ra
	      while (TM_MFRC522_Check(CardID) == MI_OK)
	      {
	          HAL_Delay(100);
	      }

	     // HAL_GPIO_WritePin(GPIOG, GPIO_PIN_13, GPIO_PIN_RESET); // LED3 OFF
	     // HAL_GPIO_WritePin(GPIOG, GPIO_PIN_14, GPIO_PIN_RESET); // LED4 OFF
	  }
	  else
	  	  {
	  	      SH1106_Fill(0);
	  	      sprintf(buf, "No Card");
	  	      uint8_t len = strlen(buf) * 11;
	  	      uint8_t x_pos = (128 - len) / 2;
	  	      SH1106_GotoXY(x_pos, 10);
	  	      SH1106_Puts(buf, &Font_11x18, 1);
	  	      SH1106_UpdateScreen();
	  	  }



	     /* USER CODE BEGIN 3 */

  /* USER CODE END 3 */
  }
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
  RCC_OscInitStruct.PLL.PLLM = 8;
  RCC_OscInitStruct.PLL.PLLN = 180;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
  RCC_OscInitStruct.PLL.PLLQ = 4;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Activate the Over-Drive mode
  */
  if (HAL_PWREx_EnableOverDrive() != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief I2C3 Initialization Function
  * @param None
  * @retval None
  */
static void MX_I2C3_Init(void)
{

  /* USER CODE BEGIN I2C3_Init 0 */

  /* USER CODE END I2C3_Init 0 */

  /* USER CODE BEGIN I2C3_Init 1 */

  /* USER CODE END I2C3_Init 1 */
  hi2c3.Instance = I2C3;
  hi2c3.Init.ClockSpeed = 400000;
  hi2c3.Init.DutyCycle = I2C_DUTYCYCLE_2;
  hi2c3.Init.OwnAddress1 = 0;
  hi2c3.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  hi2c3.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
  hi2c3.Init.OwnAddress2 = 0;
  hi2c3.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
  hi2c3.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
  if (HAL_I2C_Init(&hi2c3) != HAL_OK)
  {
    Error_Handler();
  }

  /** Configure Analogue filter
  */
  if (HAL_I2CEx_ConfigAnalogFilter(&hi2c3, I2C_ANALOGFILTER_ENABLE) != HAL_OK)
  {
    Error_Handler();
  }

  /** Configure Digital filter
  */
  if (HAL_I2CEx_ConfigDigitalFilter(&hi2c3, 0) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN I2C3_Init 2 */

  /* USER CODE END I2C3_Init 2 */

}

/**
  * @brief SPI4 Initialization Function
  * @param None
  * @retval None
  */
static void MX_SPI4_Init(void)
{

  /* USER CODE BEGIN SPI4_Init 0 */

  /* USER CODE END SPI4_Init 0 */

  /* USER CODE BEGIN SPI4_Init 1 */

  /* USER CODE END SPI4_Init 1 */
  /* SPI4 parameter configuration*/
  hspi4.Instance = SPI4;
  hspi4.Init.Mode = SPI_MODE_MASTER;
  hspi4.Init.Direction = SPI_DIRECTION_2LINES;
  hspi4.Init.DataSize = SPI_DATASIZE_8BIT;
  hspi4.Init.CLKPolarity = SPI_POLARITY_LOW;
  hspi4.Init.CLKPhase = SPI_PHASE_1EDGE;
  hspi4.Init.NSS = SPI_NSS_SOFT;
  hspi4.Init.BaudRatePrescaler = SPI_BAUDRATEPRESCALER_16;
  hspi4.Init.FirstBit = SPI_FIRSTBIT_MSB;
  hspi4.Init.TIMode = SPI_TIMODE_DISABLE;
  hspi4.Init.CRCCalculation = SPI_CRCCALCULATION_DISABLE;
  hspi4.Init.CRCPolynomial = 10;
  if (HAL_SPI_Init(&hspi4) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN SPI4_Init 2 */

  /* USER CODE END SPI4_Init 2 */

}

/**
  * @brief USART1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART1_UART_Init(void)
{

  /* USER CODE BEGIN USART1_Init 0 */

  /* USER CODE END USART1_Init 0 */

  /* USER CODE BEGIN USART1_Init 1 */

  /* USER CODE END USART1_Init 1 */
  huart1.Instance = USART1;
  huart1.Init.BaudRate = 115200;
  huart1.Init.WordLength = UART_WORDLENGTH_8B;
  huart1.Init.StopBits = UART_STOPBITS_1;
  huart1.Init.Parity = UART_PARITY_NONE;
  huart1.Init.Mode = UART_MODE_TX_RX;
  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart1.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart1) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART1_Init 2 */

  /* USER CODE END USART1_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
  /* USER CODE BEGIN MX_GPIO_Init_1 */

  /* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOE_CLK_ENABLE();
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOE, GPIO_PIN_4, GPIO_PIN_RESET);

  /*Configure GPIO pin : PE4 */
  GPIO_InitStruct.Pin = GPIO_PIN_4;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOE, &GPIO_InitStruct);

  /* USER CODE BEGIN MX_GPIO_Init_2 */

  /* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
