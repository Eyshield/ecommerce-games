package com.api.ecommerce.Games;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/game")
public class GameController {
    private GameService gameService;
    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Game> addGame(@ModelAttribute GameRequest request) {
        try {
          return ResponseEntity.status(HttpStatus.CREATED).body(gameService.addGame(request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.getGameById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<GameResponse> getGameByIdForUser(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.getGameByIdForUsers(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @ModelAttribute GameRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.updateGame(id, request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String> deleteGame(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.deleteGame(id));
        }catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<GameResponse>> searchGame(
            @RequestParam(defaultValue = "") String title,
            @PageableDefault(page = 0,size = 10)Pageable pageable
            ) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.searchGame(pageable, title));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/admin/search")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PageResponse<Game>> searchGameForAdmin(
            @RequestParam(defaultValue = "") String title,
            @PageableDefault(page = 0,size = 10)Pageable pageable

    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.searchGameForAdmin(pageable, title));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PageResponse<GameResponse>> findAllGames(
            @PageableDefault(page = 0,size = 10)Pageable pageable

    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.findAllGame(pageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/home")
    public ResponseEntity<Map<String, PageResponse<GameResponse>>> getHome(
            @Qualifier("banner")
            @PageableDefault(size = 3,page = 0) Pageable bannerPageable,
            @Qualifier("upcoming")
             @PageableDefault(size = 5,page = 0) Pageable upcomingPageable,
            @Qualifier("bestseller")
            @PageableDefault(size = 5,page = 0) Pageable bestPageable
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.getHomeGames(
                    bannerPageable,
                    upcomingPageable,
                    bestPageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }

    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, PageResponse<GameResponse>>> getDash(

            @Qualifier("upcoming")
            @PageableDefault(size = 5,page = 0) Pageable flopsPageable,
            @Qualifier("bestseller")
            @PageableDefault(size = 5,page = 0) Pageable bestPageable
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(gameService.getDashboardGames(flopsPageable,bestPageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }

    }
}
