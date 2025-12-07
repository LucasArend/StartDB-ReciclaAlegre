package db.start.reciclaalegre.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import db.start.reciclaalegre.dto.SolicitacaoRequestDto;
import db.start.reciclaalegre.model.Usuario;
import db.start.reciclaalegre.service.SolicitacaoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoRestController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoRestController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    public ResponseEntity<?> criarSolicitacao(@RequestBody SolicitacaoRequestDto dto,
            @AuthenticationPrincipal Usuario usuario) {
                
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoService.criarSolicitacao(dto, usuario.getEmail()));
    }

}
