package com.api.ecommerce.Games;

import com.api.ecommerce.Common.HomeSection;
import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ImplGameService implements GameService{
    private GameRepo gameRepo;
    private GameMapper gameMapper;
    @Override
    public Game addGame(GameRequest gameRequest) {

        return gameRepo.save(gameMapper.toGame(gameRequest));
    }

    @Override
    public Game getGameById(Long id) {
        return gameRepo.findById(id).orElseThrow(()->new RuntimeException("game not found"));
    }

    @Override
    public GameResponse getGameByIdForUsers(Long id) {
        Game game=getGameById(id);
        GameResponse gameResponse =gameMapper.toGameResponse(game);
        return gameResponse;
    }

    @Override
    public Game updateGame(Long id, GameRequest gameRequest) {
        Game game=gameMapper.toGame(gameRequest);
        game.setId(id);
        return gameRepo.save(game) ;
    }

    @Override
    public String deleteGame(Long id) {
        try {
            getGameById(id);
            gameRepo.deleteById(id);
            return "game deleted";
        }catch (Exception e){
            return e.getMessage();
        }

    }

    @Override
    public PageResponse<GameResponse> searchGame(Pageable pageable, String title) {
        Page<Game>gamePage = gameRepo.findByTitleContainingIgnoreCase(title,pageable);
        PageResponse<GameResponse> response = toPageResponse(gamePage);
        return response;
    }

    @Override
    public PageResponse <Game> searchGameForAdmin(Pageable pageable, String title) {
        Page<Game>gamePage = gameRepo.findByTitleContainingIgnoreCase(title,pageable);
        PageResponse<Game>response= new PageResponse<>(
                gamePage.getContent(),
                gamePage.getNumber(),
                gamePage.getSize(),
                gamePage.getTotalElements(),
                gamePage.getTotalPages(),
                gamePage.isFirst(),
                gamePage.isLast()
        );
        return response;
    }

    @Override
    public PageResponse<GameResponse> findAllGame(Pageable pageable) {
        Page<Game> gamePage= gameRepo.findAll(pageable);
        PageResponse<GameResponse>response=toPageResponse(gamePage);
        return response;
    }
    @Override
    public Map<String, PageResponse<GameResponse>> getHomeGames(    Pageable bannerPageable,
                                                                    Pageable upcomingPageable,
                                                                     Pageable bestPageable) {
        Map<String, PageResponse<GameResponse>> result = new HashMap<>();
        Page<Game> bannerPage =
                gameRepo.findByHomeSection(HomeSection.BANNER, bannerPageable);
        result.put("banners", toPageResponse(bannerPage));

        Page<Game> upcomingPage =
                gameRepo.findByHomeSection(HomeSection.UPCOMING, upcomingPageable);
        result.put("upcoming", toPageResponse(upcomingPage));
        Page<Game> bestSellerPage =
                gameRepo.findBestSellers(bestPageable);
        result.put("bestsellers", toPageResponse(bestSellerPage));

        return result;
    }
    @Override
    public Map<String, PageResponse<GameResponse>> getDashboardGames(
                                                                    Pageable flopPageable,
                                                                    Pageable bestPageable) {
        Map<String, PageResponse<GameResponse>> result = new HashMap<>();

        Page<Game> flopPage =
                gameRepo.findFlops(flopPageable);
        result.put("flops", toPageResponse(flopPage));
        Page<Game> bestSellerPage =
                gameRepo.findBestSellers(bestPageable);
        result.put("bestsellers", toPageResponse(bestSellerPage));

        return result;
    }
    private PageResponse<GameResponse> toPageResponse(Page<Game> gamePage) {

        List<GameResponse> content = gamePage.getContent()
                .stream()
                .map(gameMapper::toGameResponse)
                .toList();

        return new PageResponse<>(
                content,
                gamePage.getNumber(),
                gamePage.getSize(),
                gamePage.getTotalElements(),
                gamePage.getTotalPages(),
                gamePage.isFirst(),
                gamePage.isLast()
        );
    }

}
