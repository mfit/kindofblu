import { PlayerRoutingModule } from './player-routing.module';

describe('PlayerRoutingModule', () => {
  let playerRoutingModule: PlayerRoutingModule;

  beforeEach(() => {
    playerRoutingModule = new PlayerRoutingModule();
  });

  it('should create an instance', () => {
    expect(playerRoutingModule).toBeTruthy();
  });
});
