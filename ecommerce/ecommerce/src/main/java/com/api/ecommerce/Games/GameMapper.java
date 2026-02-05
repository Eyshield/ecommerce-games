package com.api.ecommerce.Games;

import com.api.ecommerce.Category.CategoryRepo;
import com.api.ecommerce.Common.FileStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GameMapper {
    private FileStorage fileStorage;
    private CategoryRepo categoryRepo;
    public Game toGame(GameRequest gameRequest){
        String imageUrl;
        if (gameRequest.getImage() != null && !gameRequest.getImage().isEmpty()) {
            imageUrl = fileStorage.saveFile(gameRequest.getImage());
        }
        else if (gameRequest.getImageUrl() != null && !gameRequest.getImageUrl().isEmpty()) {
            imageUrl = gameRequest.getImageUrl();
        }
        else {
            imageUrl = null;
        }
        return Game.builder()
                .id(gameRequest.getId())
                .title(gameRequest.getTitle())
                .price(gameRequest.getPrice())
                .description(gameRequest.getDescription())
                .plateform(gameRequest.getPlateform())
                .homeSection(gameRequest.getHomeSection())
                .releaseDate(gameRequest.getReleaseDate())
                .stock(gameRequest.getStock())
                .imageUrl(imageUrl)
                .category(categoryRepo.findById(gameRequest.getCategoryId()).orElseThrow())
                .build();

    }

    public GameResponse toGameResponse(Game game){
        return GameResponse.builder()
                .id(game.getId())
                .title(game.getTitle())
                .price(game.getPrice())
                .stock(game.getStock())
                .description(game.getDescription())
                .imageUrl(game.getImageUrl())
                .plateform(game.getPlateform())
                .category(game.getCategory().getName())
                .build();
    }
}
