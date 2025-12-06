package com.api.ecommerce.Games;

import com.api.ecommerce.Common.FileStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GameMapper {
    private FileStorage fileStorage;
    public Game toGame(GameRequest gameRequest){
        return Game.builder()
                .id(gameRequest.getId())
                .title(gameRequest.getTitle())
                .price(gameRequest.getPrice())
                .description(gameRequest.getDescription())
                .plateform(gameRequest.getPlateform())
                .releaseDate(gameRequest.getReleaseDate())
                .imageUrl(fileStorage.saveFile(gameRequest.getImage()))
                .build();

    }

    public GameResponse toGameResponse(Game game){
        return GameResponse.builder()
                .id(game.getId())
                .title(game.getTitle())
                .price(game.getPrice())
                .imageUrl(game.getImageUrl())
                .build();
    }
}
