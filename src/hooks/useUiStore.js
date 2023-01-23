import { useSelector, useDispatch } from 'react-redux';
import { onOpenDateModal, onClosedDateModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onClosedDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen) 
          ? closeDateModal()
          : openDateModal();
    }

    return {
        // Properties
        isDateModalOpen,

        // Metods
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}