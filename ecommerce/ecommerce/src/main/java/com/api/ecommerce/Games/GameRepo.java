package com.api.ecommerce.Games;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepo extends JpaRepository<Game,Long> {
    Page<Game> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
