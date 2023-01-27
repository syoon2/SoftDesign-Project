package com.softdesign.plagueinc.util;

import java.util.List;

import com.softdesign.plagueinc.models.traits.TraitCard;
import com.softdesign.plagueinc.models.traits.disease.InfectivityTrait;
import com.softdesign.plagueinc.models.traits.restriction.ColdTrait;
import com.softdesign.plagueinc.models.traits.restriction.HeatTrait;
import com.softdesign.plagueinc.models.traits.travel.AirborneTrait;

public class TraitReference {

    public static List<TraitCard> getDefaultTraitDeck(){
        //TODO: Implement default trait deck
        return List.of();
    }

    public static TraitCard paranoia(){
        return new TraitCard("paranoia", 12, List.of(new InfectivityTrait(), new InfectivityTrait()));
    }

    public static TraitCard pustules(){
        return new TraitCard("pustules", 12, List.of(new AirborneTrait(), new HeatTrait()));
    }

    public static TraitCard coldResistance(){
        return new TraitCard("cold_resistance", 4, List.of(new ColdTrait()));
    }



}