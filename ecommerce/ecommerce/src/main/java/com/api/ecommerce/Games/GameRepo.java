package com.api.ecommerce.Games;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.api.ecommerce.Common.HomeSection;
@Repository
public interface GameRepo extends JpaRepository<Game,Long> {
    Page<Game> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Game> findByHomeSection(HomeSection section, Pageable pageable);

    @Query("""
        SELECT g
        FROM OrderItem oi
        JOIN oi.game g
        JOIN oi.order o
        GROUP BY g
        ORDER BY SUM(oi.quantity) DESC
    """)
    Page<Game> findBestSellers(Pageable pageable);

    @Query("""
        SELECT g
        FROM OrderItem oi
        JOIN oi.game g
        JOIN oi.order o
        GROUP BY g
        ORDER BY SUM(oi.quantity) ASC
    """)
    Page<Game> findFlops(Pageable pageable);
}
