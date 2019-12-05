import Utilities from "utilities";

export default function(i_sModalPortalClass, i_sDraggingClass) {
    let oModalPos =  {
        x: 0,
        y: 0
    };

    let draggableGhostEl = null;

    return {
        fnOnDragHandler: (event, data) => {
            oModalPos = { x: data.x, y: data.y };
        },
        fnOnAfterOpenHandler: () => {
            // This code gets the initial translation of the add tab modal
            // The delay of 20ms is to make sure the translation is applied before trying to get it
            setTimeout(() => {
                const draggableEl = document.querySelector(i_sModalPortalClass + " .ModalWrapper");
                const style = window.getComputedStyle(draggableEl);

                // Get X and Y translation
                // Source: https://codepen.io/draber/pen/dPMxGP?editors=0110

                let matrix = style.getPropertyValue("-webkit-transform") ||
                style.getPropertyValue("-moz-transform") ||
                style.getPropertyValue("-ms-transform") ||
                style.getPropertyValue("-o-transform") ||
                style.getPropertyValue("transform");
                
                // this happens when there was no rotation yet in CSS
                if(matrix === "none") {
                    matrix = "matrix(0,0,0,0,0)";
                }
                // eslint-disable-next-line no-useless-escape 
                let values = matrix.match(/([-+]?[\d\.]+)/g);

                const translateX = values[4];
                const translateY = values[5];

                // Update the state
                oModalPos = { x: translateX, y: translateY };
            }, 20);
        },
        fnSortStartHandler: () => {
            // Set ref
            draggableGhostEl = document.querySelector(i_sModalPortalClass + " .DraggableList__list-item" + i_sDraggingClass);
        },
        fnSortMoveHandler: () => {
            const { x, y } = oModalPos;

            let nElTop = draggableGhostEl.style.top;
            nElTop = parseInt(nElTop.substring(0, nElTop.length-2));

            let nElLeft = draggableGhostEl.style.left;
            nElLeft = parseInt(nElLeft.substring(0, nElLeft.length-2));

            const nCorrectedTop = nElTop - y;
            const nCorrectedLeft = nElLeft - x;

            Utilities.saveCSSProperty("--corrected-top", nCorrectedTop + "px", i_sModalPortalClass + " .DraggableList__list-item" + i_sDraggingClass);
            Utilities.saveCSSProperty("--corrected-left", nCorrectedLeft + "px", i_sModalPortalClass + " .DraggableList__list-item" + i_sDraggingClass);
        }
    };
}