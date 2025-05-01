using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EchoJournal
{
    public interface DataPersistence
    {
        void SaveMultiMuse(List<LogEntry> entries, string filePath);
        List<LogEntry> ReadMultiMuse(string filePath);
    }
}
