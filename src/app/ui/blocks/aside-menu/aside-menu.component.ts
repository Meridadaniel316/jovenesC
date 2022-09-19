import { Component, ChangeDetectionStrategy, Input, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelEnum } from 'src/app/core/enums/channel.enum';
import { fromRolEnum } from 'src/app/core/enums/rols.enum';
import { ChannelModel } from 'src/app/core/models/channel.model';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'mr-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideMenuComponent {
  @Input() isVisible = false;
  @Input() channels: ChannelModel[];
  @Input() channel: ChannelModel;
  @Input() currentUser: UserModel;
  @Output() clickedLogout: EventEmitter<void> = new EventEmitter();

  public isOpen = false;

  constructor(
    private router: Router
  ) { }

  get channelsFiltered(): ChannelModel[] {
    return fromRolEnum(this.currentUser?.rol) === 'user' 
      ? this.channels.filter((channel) => channel.type !== ChannelEnum.admin) 
      : this.channels;
  }
  
  handleClick(): void {
    this.isOpen = !this.isOpen;
  }

  handleLogout(): void {
    this.clickedLogout.emit();
  }

  navigateProfile(): void {
    this.router.navigateByUrl(`profile/my/${this.currentUser.id}`);
  }

  navigateHome(): void {
    this.router.navigateByUrl('/');
  }
}
