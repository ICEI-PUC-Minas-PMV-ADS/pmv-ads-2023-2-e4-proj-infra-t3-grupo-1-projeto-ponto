﻿using System;
namespace ClockIn.Application.Exceptions
{
	public class LoginFailedException : Exception
    {
        public LoginFailedException(string message) : base(message)
        {
        }

        public LoginFailedException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

