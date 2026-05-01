import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import SignatureGenerator from './components/SignatureGenerator';
import { ISignatureGeneratorProps, ISignatureInitialData } from './components/ISignatureGeneratorProps';

export interface ISignatureGeneratorWebPartProps {}

export default class SignatureGeneratorWebPart extends BaseClientSideWebPart<ISignatureGeneratorWebPartProps> {
  private _initialData: ISignatureInitialData = {};

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._initialData = await this._loadCurrentUserInitialData();
  }

  public render(): void {
    const element: React.ReactElement<ISignatureGeneratorProps> = React.createElement(
      SignatureGenerator,
      {
        initialData: this._initialData
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private async _loadCurrentUserInitialData(): Promise<ISignatureInitialData> {
    const fallback: ISignatureInitialData = {
      name: this.context.pageContext.user.displayName,
      email: this.context.pageContext.user.email || ''
    };

    try {
      const graphClient: MSGraphClientV3 = await this.context.msGraphClientFactory.getClient('3');
      const me = await graphClient
        .api('/me')
        .select('displayName,mail,userPrincipalName,jobTitle,mobilePhone,businessPhones,onPremisesExtensionAttributes')
        .get();

      const customAttributes = me.onPremisesExtensionAttributes || {};
      me.extensionAttribute1 = customAttributes.extensionAttribute1 || '';

      const businessPhone: string = Array.isArray(me.businessPhones) && me.businessPhones.length > 0
        ? String(me.businessPhones[0])
        : '';

      return {
        name: me.displayName || fallback.name,
        email: me.mail || me.userPrincipalName || fallback.email,
        roleEn: me.jobTitle || '',
        cell: me.mobilePhone || '',
        ext: this._extractExtensionFromPhone(businessPhone),
        roleFr: me.extensionAttribute1 || ''

      };
    } catch {
      return fallback;
    }
  }

  private _extractExtensionFromPhone(phone: string): string {
    if (!phone) {
      return '';
    }

    const extMatch: RegExpMatchArray | null = phone.match(/(?:ext\.?|x)\s*(\d{2,8})/i);
    if (extMatch && extMatch[1]) {
      return extMatch[1];
    }

    return '';
  }
}
