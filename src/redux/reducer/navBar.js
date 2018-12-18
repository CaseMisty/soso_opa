import { handleAction } from 'redux-actions';
export const navBarStore = handleAction('CHANGE_NAV_BAR_ACTIVE_IDX', (state, action) => ({
  ...state,
  activeIdx: action.payload
}), { activeIdx: 0 });
