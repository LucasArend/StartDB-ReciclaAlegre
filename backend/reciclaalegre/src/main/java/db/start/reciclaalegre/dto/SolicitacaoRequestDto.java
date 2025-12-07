package db.start.reciclaalegre.dto;

import java.util.List;

import db.start.reciclaalegre.model.Material;

public record SolicitacaoRequestDto(
    List<Material> materiais,
    String descricao
) {

}
