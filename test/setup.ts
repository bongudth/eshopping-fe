import chai from 'chai';
import dirtyChai from 'dirty-chai';
import chaiSpies from 'chai-spies';
import { config } from '@vue/test-utils';

chai.use(dirtyChai);
chai.use(chaiSpies);

config.mocks!.$t = (key: string) => key;
config.mocks!.localePath = (route: any) => route;
config.stubs!['b-icon'] = true;
