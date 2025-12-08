import { Divider } from 'lotus-ui-react/components/Display';
import { Box, VerticalStack, type IVerticalStackProps } from 'lotus-ui-react/components/Layout';
import { isValidElement, type ReactNode } from "react";
import { Assert } from "lotus-core/utils";

export interface IContainerFormProps extends IVerticalStackProps
{
  header: ReactNode;
  hasDivider?: boolean;
}

export function ContainerForm(props: IContainerFormProps)
{
  const { header, hasDivider, ...verticalStackProps } = props;

  const p = verticalStackProps.p ?? 'md';
  const m = verticalStackProps.m ?? 'md';

  return (
    <VerticalStack spacing={verticalStackProps.spacing ?? 'md'}
      borderRadius={verticalStackProps.borderRadius ?? 'sm'}
      p={p}
      m={m }
      w={verticalStackProps.w ?? 'min(400px, 80vw)'}
      hAlign={verticalStackProps.hAlign ?? 'stretch'}
      {...verticalStackProps}>

      {isValidElement(header) && <Box centerContent={'center'} >{header}</Box>}
      { Assert.isString(header) && <Box centerContent={'center'} style={{fontSize: '1.5rem'}} >{header}</Box>}

      {hasDivider && <Divider ml={m} mr={m} nml nmr />}

      { props.children }
    </VerticalStack>
  );
};
