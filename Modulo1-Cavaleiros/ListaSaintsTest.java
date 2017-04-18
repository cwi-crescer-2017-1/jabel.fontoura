import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ListaSaintsTest {
    
    @Test
    public void saintDeveSerAdicionandoNaLista() throws Exception {
        Saint seiya = new Saint("Seiya", new Armadura(new Constelacao("Pegaso"), Categoria.BRONZE));
        
        ListaSaints lista = new ListaSaints();
        
        lista.adicionar(seiya);
        
        assertEquals(lista.get(0), seiya);
        
    }
}