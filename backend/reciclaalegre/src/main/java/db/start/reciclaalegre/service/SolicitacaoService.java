package db.start.reciclaalegre.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import db.start.reciclaalegre.dto.SolicitacaoRequestDto;
import db.start.reciclaalegre.model.Solicitacao;
import db.start.reciclaalegre.model.Usuario;
import db.start.reciclaalegre.model.enums.StatusSolicitacao;
import db.start.reciclaalegre.repository.SolicitacaoRepository;
import db.start.reciclaalegre.utils.usuario.UsuarioUtils;
import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final UsuarioUtils usuarioUtils;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository, UsuarioUtils usuarioUtils) {
        this.solicitacaoRepository = solicitacaoRepository;
        this.usuarioUtils = usuarioUtils;
    }

    @Transactional
    public Solicitacao criarSolicitacao(SolicitacaoRequestDto dto, String email) {
        Usuario usuario = usuarioUtils.validarUsuario(email);

        Solicitacao solicitacao = new Solicitacao(null, usuario.getPerfil(), null, LocalDateTime.now(),
                usuario.getPerfil().getEndereco(), dto.materiais(), StatusSolicitacao.ATIVO, dto.descricao());
        solicitacaoRepository.save(solicitacao);

        return solicitacao;
    }

}
