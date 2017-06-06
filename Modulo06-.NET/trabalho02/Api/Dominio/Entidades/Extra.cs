﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Entidades
{
    public class Extra
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public int Quantidade { get; set; }
        public virtual List<ExtraPacote> Pacotes { get; set; }
        public virtual List<Locacao> Locacao { get; set; }

        public Extra()
        { }
    }
}
