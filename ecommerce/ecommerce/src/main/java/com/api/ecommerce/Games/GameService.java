package com.api.ecommerce.Games;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Pageable;

public interface GameService {
    Game addGame(GameRequest gameRequest);
    Game getGameById(Long id);
    Game updateGame(Long id,GameRequest gameRequest);
    String deleteGame(Long id);

   PageResponse <GameResponse> searchGame(Pageable pageable, String title);
    PageResponse<Game> searchGameForAdmin(Pageable pageable,String title);
    PageResponse<Game>findAllGame(Pageable pageable);








}
