package db.start.reciclaalegre.model;

import java.util.List;

import db.start.reciclaalegre.model.enums.TipoGerador;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioGerador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Usuario usuario;
    @Embedded
    private Endereco endereco;
    @Enumerated(EnumType.STRING)
    private TipoGerador tipo;
    @OneToMany(mappedBy = "gerador")
    private List<Solicitacao> solicitacoes;
}
