package br.com.crescer.social.service;

 // @author jabel.fontoura
import br.com.crescer.social.service.interfaces.AmigosService;
import br.com.crescer.social.model.Amigos;
import br.com.crescer.social.model.Usuario;
import br.com.crescer.social.repository.AmigosRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmigosServiceImpl implements AmigosService {

  @Autowired
  private AmigosRepository repositorio;

  @Override
  public void delete(BigDecimal id) {
    repositorio.delete(id);
  }
  
  @Override
  public Amigos save(Amigos a) {
    if(a != null) {
      if(a.getAceito().equals('A')){
        atualizarAmizade(a);
      }else if(a.getAceito().equals('R')){
        repositorio.delete(a);
        return null;
      }
    }
    
    return repositorio.save(a);
  }

  @Override
  public List<Amigos> findAll() {
    return (List<Amigos>) repositorio.findAll();
  }
  
  @Override
  public List<Amigos> findAllByIdUsuario(BigDecimal idUsuario) {
    final Usuario usuario = new Usuario();
    usuario.setId(idUsuario);
    
    return repositorio.findAllByIdUsuario(usuario);
  }
  
  @Override
  public List<Amigos> findAllByIdUsuarioAndAceito(BigDecimal idUsuario, Character aceito) {
    final Usuario usuario = new Usuario();
    usuario.setId(idUsuario);
    
    return repositorio.findByIdUsuarioAndAceito(usuario, aceito);
  }
  
  @Override
  public List<Amigos> findAllByIdAmigoAndAceito(BigDecimal idUsuario, Character aceito) {
    final Usuario usuario = new Usuario();
    usuario.setId(idUsuario);
    
    return repositorio.findByIdAmigoAndAceito(usuario, aceito);
  }

  @Override
  public Amigos findById(BigDecimal id) {
    return repositorio.findOne(id);
  }
  
  @Override
  public Amigos findByIdUsuarioAndIdAmigo(Usuario idUsuario, Usuario idAmigo) {
    return repositorio.findByIdUsuarioAndIdAmigo(idUsuario, idAmigo);
  }
  
  @Override
  public Long countByIdUsuarioAndAceito(BigDecimal idUsuario, Character aceito) {
    final Usuario usuario = new Usuario();
    usuario.setId(idUsuario);
    
    return repositorio.countByIdAmigoAndAceito(usuario, aceito);
  }
  
  private void atualizarAmizade(Amigos amigos) {
    Amigos amizadeInvertida = new Amigos();
    
    amizadeInvertida.setId(BigDecimal.ZERO);
    amizadeInvertida.setIdUsuario(amigos.getIdAmigo());
    amizadeInvertida.setIdAmigo(amigos.getIdUsuario());
    amizadeInvertida.setAceito('A');
    
    repositorio.save(amizadeInvertida);
  }
}
