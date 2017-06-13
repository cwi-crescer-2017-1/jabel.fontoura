/* 1) Atualmente a tabela de Cidade tem registros duplicados (nome e UF). Fa�a um c�digo (PL/SQL) que liste quais s�o as cidades duplicadas. 
Ap�s isso liste todos os clientes que est�o relacionados com estas cidades
*/
DECLARE
 CURSOR C_ListaCidades IS
     SELECT COUNT (*), Nome, UF FROM CIDADE 
    GROUP BY Nome, UF HAVING COUNT(*) > 1 ;
 CURSOR C_ClientesPorCidades(cidadeAtual in string) IS
  SELECT cli.Nome AS NomeCliente, cid.Nome AS NomeCidade FROM Cliente cli JOIN Cidade cid ON cli.IDCIDADE = cid.IDCIDADE
  WHERE cid.Nome LIKE cidadeAtual;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('---Cidades duplicadas');
   FOR reg IN C_ListaCidades LOOP
    DBMS_OUTPUT.PUT_LINE('Cidade -- ' || reg.nome);
    FOR item  in C_ClientesPorCidades(reg.nome) LOOP
      DBMS_OUTPUT.PUT_LINE('Cliente -- ' || item.nomeCliente);
     END LOOP;
   END LOOP;
END;

