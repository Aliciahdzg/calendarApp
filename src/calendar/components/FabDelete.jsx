import { useSelector } from "react-redux";
import { useCalendarStore } from "../../hooks"


export const FabDelete = () => {

    const { isDateModalOpen } = useSelector( state => state.ui )

    const { startDeletingEvent, hasEventSelected  } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

  return (
    <button
        aria-label="btn-delete"
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{ 
            display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
