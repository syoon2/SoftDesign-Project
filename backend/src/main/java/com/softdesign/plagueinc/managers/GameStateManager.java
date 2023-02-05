package com.softdesign.plagueinc.managers;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.softdesign.plagueinc.managers.futures.input_types.CountryChoice;
import com.softdesign.plagueinc.models.countries.Country;
import com.softdesign.plagueinc.models.gamestate.GameState;
import com.softdesign.plagueinc.models.plague.PlagueColor;

@Component
public class GameStateManager {

    @JsonIgnore
    Logger logger = LoggerFactory.getLogger(GameStateManager.class);
    
    private Map<String, GameState> games;

    public GameStateManager(){
        this.games = new HashMap<>();
    }

    public String createGame(){
        String randomId;
        while(games.containsKey(randomId = generateRandomId())){}
        games.put(randomId, new GameState());
        return randomId;
    }

    public UUID joinGame(String gameStateId, PlagueColor plagueColor){
        if(plagueColor == null){
            throw new IllegalArgumentException("Provided plague must have a color");
        }
        if(!games.containsKey(gameStateId)){
            throw new IllegalArgumentException("Provided game state does not exist");
        }
        return games.get(gameStateId).joinGame(plagueColor);
    }

    public void voteToStart(String gameStateId, UUID plagueId){
        games.get(gameStateId).startGame(plagueId);
    }

    public void proceedState(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).proceedState();
    }

    public Country drawCountryAction(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        return games.get(gameStateId).drawCountryAction();
    }

    public Country selectCountryFromRevealed(String gameStateId, UUID plagueId, String name){
        games.get(gameStateId).verifyTurn(plagueId);
        return games.get(gameStateId).selectCountryFromRevealed(name);
    }

    public void playCountry(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).makeCountryChoice(CountryChoice.PLAY);
    }

    public void discardCountry(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).makeCountryChoice(CountryChoice.DISCARD);
    }

    public void evolveTrait(String gameStateId, UUID plagueId, int traitSlot, int traitIndex){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).evolveTrait(traitSlot, traitIndex);
    }

    public void skipEvolve(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).skipEvolve();
    }

    public void attemptInfect(String gameStateId, UUID plagueId, String countryName){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).attemptInfect(countryName);
    }

    public void rollDeathDice(String gameStateId, UUID plagueId){
        games.get(gameStateId).verifyTurn(plagueId);
        games.get(gameStateId).rollDeathDice();
    }

    public GameState getGameState(String gameStateId){
        return games.get(gameStateId);
    }

    private static String generateRandomId(){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 4;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
        .limit(targetStringLength)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
        return generatedString.toUpperCase();
    }

    
}
