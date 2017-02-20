export * from './factory.component';

import { ToolsListComponent } from './sections/toolsList/toolsList.component';
import { ToolItemComponent } from './sections/toolsList/components/toolItem.component';
import { SettingsComponent } from './sections/settings/settings.component';
import { EnergyComponent } from './sections/energy/energy.component';

export const FactorySectionsList = [
  ToolsListComponent,
  ToolItemComponent,
  SettingsComponent,
  EnergyComponent
];