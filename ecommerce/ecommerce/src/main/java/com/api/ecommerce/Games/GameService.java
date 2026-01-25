package com.api.ecommerce.Games;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface GameService {
    Game addGame(GameRequest gameRequest);
    Game getGameById(Long id);
    Game updateGame(Long id,GameRequest gameRequest);
    String deleteGame(Long id);

   PageResponse <GameResponse> searchGame(Pageable pageable, String title);
    PageResponse<Game> searchGameForAdmin(Pageable pageable,String title);
    PageResponse<GameResponse>findAllGame(Pageable pageable);
     Map<String, PageResponse<GameResponse>> getHomeGames(Pageable bannerPageable,
                                                          Pageable upcomingPageable,
                                                          Pageable bestPageable);








}
