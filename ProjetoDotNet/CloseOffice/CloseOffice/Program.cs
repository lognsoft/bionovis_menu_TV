using System;
using System.Diagnostics;

namespace FecharOffice
{
    internal class Program
    {

        static readonly string[] officeProcessNames = new[]
        {
            "WINWORD",   
            "EXCEL",      
            "POWERPNT",   
            "OUTLOOK",    
            "MSPUB",      
            "ONEPOWER",  
        };

        private static void Main(string[] args)
        {
            Console.WriteLine("Verificando processos do Office em execução...");
            bool anyClosed = false;

            foreach (string procName in officeProcessNames)
            {
                Process[] processos = Process.GetProcessesByName(procName);
                if (processos.Length == 0)
                    continue;

                foreach (Process proc in processos)
                {
                    try
                    {
                        Console.WriteLine($"Encontrado: {proc.ProcessName} (PID: {proc.Id}). SoftClose...");

                        if (!proc.CloseMainWindow())
                        {
                            Console.WriteLine("  → HardClose...");
                            proc.Kill();
                        }
                        else
                        {
                            if (!proc.WaitForExit(5000))
                            {
                                Console.WriteLine("  → Kill()...");
                                proc.Kill();
                            }
                        }

                        Console.WriteLine($"  → {proc.ProcessName} (PID: {proc.Id}) closed.");
                        anyClosed = true;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"  → Erro ao tentar fechar {proc.ProcessName} (PID: {proc.Id}): {ex.Message}");
                    }
                }
            }

            if (!anyClosed)
            {
                Console.WriteLine("Nenhum aplicativo do Office encontrado em execução.");
            }
            else
            {
                Console.WriteLine("Operação concluída. Todos os aplicativos Office abertos foram fechados.");
            }

            if (Environment.UserInteractive)
            {
                Console.WriteLine("Pressione qualquer tecla para sair...");
               // Console.ReadKey();
            }
        }
    }
}
