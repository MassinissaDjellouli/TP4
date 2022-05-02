package com.service;


import com.dto.ClientDTO;
import com.dto.DocumentDTO;
import com.dto.ModelToDTOTransformer;
import com.models.documents.Livre;
import com.models.documents.Media;
import com.models.enums.Genres;
import com.models.enums.MediaType;
import com.models.users.Client;
import com.repository.ClientRepository;
import com.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component

public class EmployeeService {
    @Autowired
    DocumentRepository documentRepository;
    @Autowired
    ClientRepository clientRepository;
    public int saveLivre(String titre, String auteur, String editeur, int anne, int tmpEmprunt, int nbExemplaires, int nbPages, Genres genre) {
        Livre livre = Livre.builder().titre(titre).auteur(auteur).editeur(editeur)
                .anneeDePublication(anne).tempsEmprunt(tmpEmprunt)
                .nbExemplaires(nbExemplaires).nbPages(nbPages).genre(genre).build();
        documentRepository.save(livre);
        System.out.println(livre.getDocumentId());
        return livre.getDocumentId();
    }

    public int saveMedia(String titre, String auteur, String editeur, int anne, int tmpEmprunt, int nbExemplaires, String duree, MediaType type) {
        Media media = Media.builder().titre(titre).auteur(auteur).editeur(editeur)
                .anneeDePublication(anne).tempsEmprunt(tmpEmprunt)
                .nbExemplaires(nbExemplaires).duree(duree).type(type).build();
        documentRepository.save(media);
        System.out.println(media.getDocumentId());
        return media.getDocumentId();
    }

    public List<ClientDTO> getClientList(){
        return ModelToDTOTransformer.clientListToClientListDTO(clientRepository.findAll());
    }

    private <T> List<T> handleOptionalList(Optional<List<T>> optional) throws IllegalArgumentException{
        if (optional.isEmpty()) return Collections.emptyList();
        return optional.get();
    }

    private <T> T handleOptional(Optional<T> optional) throws IllegalArgumentException{
        if (optional.isEmpty()) throw new IllegalArgumentException();
        return optional.get();
    }
}
