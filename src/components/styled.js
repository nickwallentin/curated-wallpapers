import { styled } from "linaria/react"

export const Wrap = styled.div`
  max-width: 95%;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
  }
`

export const Sec = styled.section`
  padding: ${props => props.space || "var(--b-space-section) 0"};
  background: ${props => props.bg || "var(--c-bg)"};
  color: var(--c-text);
  font-size: var(--b-font-size);
  line-height: var(--b-line-height);

  @media (min-width: 600px) {
    padding: ${props =>
      props.space || "calc(var(--b-space-section) * var(--x-m)) 0"};
    font-size: calc(var(--b-font-size) * var(--x-m));
    line-height: calc(var(--b-line-height) * var(--x-m));
  }
  @media (min-width: 980px) {
    padding: ${props =>
      props.space || "calc(var(--b-space-section) * var(--x-l)) 0"};
    font-size: calc(var(--b-font-size) * var(--x-l));
    line-height: calc(var(--b-line-height) * var(--x-l));
  }
`
export const Row = styled.div`
  padding: ${props => props.space || "var(--b-space-row) 0"};

  @media (min-width: 600px) {
    padding: calc(var(--b-space-row) * var(--x-m)) 0;
  }
  @media (min-width: 980px) {
    padding: calc(var(--b-space-row) * var(--x-l)) 0;
  }
`

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "center"};
`
export const Grid = styled.div`
  display: grid;
  grid-gap: var(--b-gap);
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-gap: calc(var(--b-gap) * var(--x-m));
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 980px) {
    grid-gap: calc(var(--b-gap) * var(--x-l));
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
export const Title = styled.h1`
  font-size: var(--b-title-size);
  small {
    display: block;
    color: var(--c-accent);
    font-size: 40%;
  }

  @media (min-width: 600px) {
    font-size: calc(var(--b-title-size) * var(--x-m));
  }
  @media (min-width: 980px) {
    font-size: calc(var(--b-title-size) * var(--x-l));
  }
`

export const SectionTitle = styled.h2`
  font-size: var(--b-section-title-size);
  small {
    display: block;
    color: var(--c-accent);
    font-size: 40%;
  }

  @media (min-width: 600px) {
    font-size: calc(var(--b-section-title-size) * var(--x-m));
  }
  @media (min-width: 980px) {
    font-size: calc(var(--b-section-title-size) * var(--x-l));
  }
`
