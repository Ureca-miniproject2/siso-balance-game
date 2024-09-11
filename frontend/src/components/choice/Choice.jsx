import React from 'react';
import * as S from './Choice.styled';
import { useEffect, useState } from 'react';


export default function Choice(props) {
    const { game } = props
    console.log(game)
    return (
        <S.ItemContainer>
            <S.ItemList>{game.firstTitle}</S.ItemList>
            <S.ItemList2>{game.secondTitle}</S.ItemList2>
        </S.ItemContainer>
    );
}
