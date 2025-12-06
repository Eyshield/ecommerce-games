package com.api.ecommerce.Games;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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
        List<GameResponse> responses = gamePage.getContent()
                .stream()
                .map(gameMapper::toGameResponse)
                .toList();
        PageResponse<GameResponse> response= new PageResponse<>(
                responses,
                gamePage.getNumber(),
                gamePage.getSize(),
                gamePage.getNumberOfElements(),
                gamePage.getTotalPages(),
                gamePage.isFirst(),
                gamePage.isLast()

        );
        return response;
    }

    @Override
    public PageResponse <Game> searchGameForAdmin(Pageable pageable, String title) {
        Page<Game>gamePage = gameRepo.findByTitleContainingIgnoreCase(title,pageable);
        PageResponse<Game>response= new PageResponse<>(
                gamePage.getContent(),
                gamePage.getNumber(),
                gamePage.getSize(),
                gamePage.getNumberOfElements(),
                gamePage.getTotalPages(),
                gamePage.isFirst(),
                gamePage.isLast()
        );
        return response;
    }

    @Override
    public PageResponse<Game> findAllGame(Pageable pageable) {
        Page<Game> gamePage= gameRepo.findAll(pageable);
        PageResponse<Game>response=new PageResponse<>(
                gamePage.getContent(),
                gamePage.getNumber(),
                gamePage.getSize(),
                gamePage.getNumberOfElements(),
                gamePage.getTotalPages(),
                gamePage.isFirst(),
                gamePage.isLast()
        );
        return response;
    }
}
