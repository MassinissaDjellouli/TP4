package com.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmpruntDTO {
    private String empruntId;
    private String clientName;
    private String empruntDate;
    private String returnDate;
    private String documentName;
    private String returned;
}
