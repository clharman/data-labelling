import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import moment from 'moment';

import { POP_CARD, PUSH_CARD, SET_LABEL, SET_MESSAGE, CLEAR_DECK, SET_URL } from '../actions/classifier'

const initialState = {
    cards: [],
    message: '',
    codebook_url: '',
    labels: []
};

const classifier = handleActions({
    [POP_CARD]: (state) => {
        // Set the start time of the new top card to the current time
        if (state.cards.length > 1) {
            state.cards[1]['start_time'] = moment();
        }
        return update(state, { cards: { $splice: [[0, 1]] } } )
    },
    [PUSH_CARD]: (state, action) => {
        // Set the start time of the new top card to the current time
        if (state.cards.length > 0) {
            state.cards[0]['start_time'] = moment();
        }
        return update(state, { cards: { $push: [action.payload] } } )
    },
    [SET_LABEL]: (state, action) => {
        // Set the start time of the new top card to the current time
        return update(state, { labels: { $set: [action.payload] } } )
    },
    [SET_MESSAGE]: (state, action) => (
        update(state, { message: { $set: [action.payload] } } )
    ),
    [CLEAR_DECK]: (state) => (
        update(state, { cards : { $set: [] } } )
    ),
    [SET_URL]: (state, action) => (
        update(state, {codebook_url: { $set: [action.payload] } } )
    )
}, initialState);

export default classifier;
