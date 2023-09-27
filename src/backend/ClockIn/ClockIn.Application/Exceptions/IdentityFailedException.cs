using System;
namespace ClockIn.Application.Exceptions
{
	public class IdentityFailedException : Exception
    {
        public IdentityFailedException(string message) : base(message)
        {
        }

        public IdentityFailedException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

