import { Assert } from 'lotus-core/utils';
import { Divider } from 'lotus-ui-react/components/Display';
import { Box, VerticalStack, type IVerticalStackProps } from 'lotus-ui-react/components/Layout';
import { isValidElement, type ReactNode } from 'react';

export interface IContainerFormProps extends IVerticalStackProps
{
  header: ReactNode;
  hasDivider?: boolean;
}

export function ContainerForm(props: IContainerFormProps)
{
  const { header, hasDivider, children, ...verticalStackProps } = props;

  const p = verticalStackProps.p ?? 'md';
  const m = verticalStackProps.m ?? 'md';

  return (
    <VerticalStack bdRadius={verticalStackProps.bdRadius ?? 'md'}
      hAlign={verticalStackProps.hAlign ?? 'stretch'}
      m={m}
      p={p}
      spacing={verticalStackProps.spacing ?? 'md'}
      w={verticalStackProps.w ?? 'min(400px, 80vw)'}
      {...verticalStackProps}>

      {isValidElement(header) && <Box centerContent={'center'}>{header}</Box>}
      { Assert.isString(header) && <Box centerContent={'center'} style={{ fontSize: '1.5rem' }}>{header}</Box>}

      {hasDivider && <Divider nml nmr ml={m} mr={m} />}

      { children }
    </VerticalStack>
  );
}
