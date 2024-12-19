import styled from "styled-components";

export const StyledContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    flex: 2;
    height: 100%;
    border-right: 1px solid ${(props) => props.theme.colors.containerLine};
    overflow-y: auto;
    overflow-x: hidden;

    /* Scrollbar Styling */

    ::-webkit-scrollbar {
        width: 4px; /* Ancho de la scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colors.backgroundSecondary}; /* Fondo de la scrollbar */
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #eae8e8; /* Color del thumb */
        border-radius: 8px;

        &:hover {
            background: #d5cfcf /* Color del thumb al hover */
        }

        transition: background 0.3s;
    }


    .tweet-box-container {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 600px) {
        .tweet-box-container {
            display: none;
        }
    }
`;
