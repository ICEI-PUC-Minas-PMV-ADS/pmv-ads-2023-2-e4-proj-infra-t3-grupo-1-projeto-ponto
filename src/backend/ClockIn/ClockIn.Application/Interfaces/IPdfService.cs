using ClockIn.Application.DTOs.PdfDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClockIn.Application.Interfaces
{
    public interface IPdfService
    {
        public byte[] GeneratePdf(PdfDTO pdfDTO);

    }
}
