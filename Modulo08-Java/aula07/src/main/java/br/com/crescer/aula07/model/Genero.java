package br.com.crescer.aula07.model;

 // @author Jabel
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name = "GENERO")
public class Genero {
  
  @Id
  @SequenceGenerator(name = "SEQ_GENERO", sequenceName = "SEQ_GENERO")
  @GeneratedValue(strategy = SEQUENCE, generator = "SEQ_GENERO")
  @Basic(optional = false)
  private Long id;
  
  @Column(name = "DESCRICAO")
  @Basic(optional = false)
  private String descricao;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}