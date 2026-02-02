package com.api.ecommerce.Common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse <T>{
    private List<T>content;
    private int page;
    private int size;
    private long TotalElements;
    private int TotalPages;
    private Boolean isFirst;
    private Boolean isLast;

}
