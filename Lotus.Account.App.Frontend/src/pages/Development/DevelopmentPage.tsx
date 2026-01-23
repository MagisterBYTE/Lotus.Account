import { Environment } from 'lotus-core/environment';
import { DateTimeFormatter } from 'lotus-core/formatters';
import { HumanizerPerson } from 'lotus-core/modules/humanizer';
import { BlockValues, type IBlockValueProps } from 'lotus-ui-react/components/Display';
import { HorizontalStack, Panel } from 'lotus-ui-react/components/Layout';
import { useAuthContext } from '#provider';

export function DevelopmentPage() 
{
  const userContext= useAuthContext();

  const blockValuesEnvironment: Partial<IBlockValueProps>[] = [];
  blockValuesEnvironment.push({ label: 'FrontApi', value: Environment.frontApi });
  blockValuesEnvironment.push({ label: 'BackendApi', value: Environment.backendApi });
  blockValuesEnvironment.push({ label: 'Version', value: Environment.version });
  blockValuesEnvironment.push({ label: 'BuildId', value: Environment.buildId });
  blockValuesEnvironment.push({ label: 'isCookieAuth', value: Environment.isCookieAuth.toString() });
  blockValuesEnvironment.push({ label: 'isTokenAuth', value: Environment.isTokenAuth.toString() });

  const blockValuesScreen: Partial<IBlockValueProps>[] = [];
  blockValuesScreen.push({ label: 'Width', value: screen.width });
  blockValuesScreen.push({ label: 'Height', value: screen.height });
  blockValuesScreen.push({ label: 'ColorDepth', value: screen.colorDepth });
  blockValuesScreen.push({ label: 'PixelDepth', value: screen.pixelDepth });
  blockValuesScreen.push({ label: 'Orientation.Type', value: screen.orientation.type });
  blockValuesScreen.push({ label: 'Orientation.Angle', value: screen.orientation.angle });
  
  const blockValuesUser: Partial<IBlockValueProps>[] = [];
  if (userContext.userAuthInfo)
  {
    const user = userContext.userAuthInfo;
    blockValuesUser.push({ label: 'AuthScheme', value: user.authScheme });
    blockValuesUser.push({ label: 'AuthExpires', value: DateTimeFormatter.formatRelativeOfDate(user.authExpires) });
    blockValuesUser.push({ label: 'ShortName', value: HumanizerPerson.getShortName(user) });
    blockValuesUser.push({ label: 'Email', value: user.email });
  }
  return (
    <HorizontalStack>
      <Panel withBorder bdRadius="lg" header={'Environment'} headerOffsetPercent={20} m={'lg'} w={'max-content'}>
        <BlockValues 
          blockValueProps={{ asBadge: false, accentBackground: true, withBorder: true, accentColor: 'blue', p: 'xs', bdRadius: 'md' }}
          blockValues={blockValuesEnvironment}
          columnCount={3}
          columnGap={'lg'}
          gridTemplateColumns={'repeat(3, auto)'}
          p={'md'} placement='vertical'
          rowCount={2} rowGap={'lg'} size='sm'
          w={'max-content'} />
      </Panel>
      <Panel withBorder bdRadius="lg" header={'Screen'} headerOffsetPercent={20} m={'lg'} w={'max-content'}>
        <BlockValues 
          blockValueProps={{ asBadge: false, accentBackground: true, withBorder: true, accentColor: 'green', p: 'xs', bdRadius: 'md' }}
          blockValues={blockValuesScreen}
          columnCount={3}
          columnGap={'lg'}
          gridTemplateColumns={'repeat(3, auto)'}
          p={'md'} placement='vertical'
          rowCount={2} rowGap={'lg'} size='sm'
          w={'max-content'} />
      </Panel>
      <Panel withBorder bdRadius="lg" header={'User'} headerOffsetPercent={20} m={'lg'} w={'max-content'}>
        <BlockValues 
          blockValueProps={{ asBadge: false, accentBackground: true, withBorder: true, accentColor: 'gold', p: 'xs', bdRadius: 'md' }}
          blockValues={blockValuesUser}
          columnCount={3}
          columnGap={'lg'}
          gridTemplateColumns={'repeat(3, auto)'}
          p={'md'} placement='vertical'
          rowCount={2} rowGap={'lg'} size='sm'
          w={'max-content'} />
      </Panel>
    </HorizontalStack>
  );
}
