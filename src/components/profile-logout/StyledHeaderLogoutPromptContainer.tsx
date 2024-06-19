import styled from "styled-components";

interface Props {
    margin: string;
}

interface ContainerProps {
    direction: string;
}

export const StyledHeaderLogoutPromptContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: ${(props) => props.direction};
`
export const StyledLogoutPrompt = styled.div<Props>`
        display: flex;
        position: absolute;
        z-index: 2;
        margin: ${(props) => props.margin};
`