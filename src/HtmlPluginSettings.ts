import { App, Platform, PluginSettingTab, Setting, Modifier } from "obsidian";
import HtmlPlugin from "./HtmlPlugin";
import { HtmlPluginOpMode, OP_MODE_INFO_DATA, OP_MODE_INFO_HTML } from "./HtmlPluginOpMode";

export interface HtmlPluginSettings {
	bgColorEnabled: boolean;
	bgColor: string; // Hex strings are 6-digit hash-prefixed rgb strings in lowercase form.
	opMode: HtmlPluginOpMode;
	zoomByWheelAndGesture: boolean;
	zoomValue: number;
	extraFileExt: string;
	mhtmlSupport: boolean; // Support MHTML, Feature request #19
	saveFormState: boolean; // Persist form input values into the HTML file
	autoReloadOnChange: boolean; // Reload the view when the file changes on disk
	blockLinkClick: boolean; // Block external link clicks by default (per-page toggle available)
}

export const DEFAULT_SETTINGS: HtmlPluginSettings = {
	bgColorEnabled: false,
	bgColor: "#ffffff",
	opMode: HtmlPluginOpMode.Balance,
	zoomByWheelAndGesture: true,
	zoomValue: 1.0,
	extraFileExt: '',
	mhtmlSupport: false, // Support MHTML, Feature request #19
	saveFormState: false, // Persist form input values into the HTML file
	autoReloadOnChange: true, // Reload the view when the file changes on disk
	blockLinkClick: true, // Block external link clicks by default
}

export class HtmlSettingTab extends PluginSettingTab {
	app: App;
	plugin: HtmlPlugin;

	constructor(app: App, plugin: HtmlPlugin) {
		super(app, plugin);
		this.app = app;
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		// store requirement: no plugin-name / "settings" / "General" headings
		// (obsidianmd/settings-tab/no-problematic-settings-headings)
		containerEl.createEl( 'pre', { text: '※ Remember to reload the file after changing any setting.', cls: 'html-studio-reload-hint' } );

		// ----- Operating Mode -----
		const opModeSetting = new Setting(containerEl);
		opModeSetting
			.setName("Operating Mode")
			.setDesc("Set operating mode for this plugin to protect user and app.")
			.addDropdown( (dropdown) => {
				dropdown.addOptions(OP_MODE_INFO_DATA);
				dropdown
					.setValue(this.plugin.settings.opMode)
					.onChange( async (opMode) => {
						this.plugin.settings.opMode = opMode as HtmlPluginOpMode;
						await this.plugin.saveSettings();
					});
			});

		let opModeInfo = (new DOMParser()).parseFromString( OP_MODE_INFO_HTML, 'text/html' );
		opModeSetting.infoEl.appendChild( opModeInfo.head.childNodes[0] ); // append <style>
		opModeSetting.infoEl.appendChild( opModeInfo.body.childNodes[0] ); // append Comparsion
		opModeSetting.infoEl.appendChild( opModeInfo.body.childNodes[1] ); // appen Detail Explanation

		// ----- General Settings: Background Color -----
		const bgColorSetting = new Setting(containerEl);
		bgColorSetting
			.setName("Background Color")
			.setDesc("Set HTML <body> element background color forcely.")
			.addColorPicker((picker) => {
				picker
					.setValue(this.plugin.settings.bgColor)
					.onChange( async (newColor: string) => {
						this.plugin.settings.bgColor = newColor;
						await this.plugin.saveSettings();
					});
			})
			.addToggle( (toggle) => {
				toggle
					.setValue(this.plugin.settings.bgColorEnabled)
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.bgColorEnabled = enabled;
						await this.plugin.saveSettings();
					});
			});

		// ----- General Settings: Extra File Extensions -----
		const extraFileExtSetting = new Setting(containerEl);
		extraFileExtSetting
			.setName("Extra File Extensions")
			.setDesc("Open HTML format files with user defined file extensions (list of comma separated strings). Change this setting may cause other plugins un-workable, so you shall know very clearly what you are doing. Remember to relaunch the Obsidian app after change this setting!")
			.addText( (val) =>
				val
					.setValue(this.plugin.settings.extraFileExt)
					.setPlaceholder("e.g. xhtml, htm123")
					.onChange( async (value: string) => {
						this.plugin.settings.extraFileExt = value;
						await this.plugin.saveSettings();
					})
			);

		// ----- General Settings: MHTML File Format Support -----
		const mhtmlSupportedSetting = new Setting(containerEl); // Support MHTML, Feature request #19
		mhtmlSupportedSetting
			.setName("MHTML File Format Support")
			.setDesc("Support with MHTML file format (.mht and .mhtml). Enable this option would convert the MHTML file format to HTML file format on the fly each time while opening the MHTML file. Therefore it would waste time on converting MHTML content! This option would override the 'Extra File Extensions' setting, and it also might cause other plugins un-workable. Remember to relaunch the Obsidian app after change this setting.")
			.addToggle( (toggle) => {
				toggle
					.setValue( this.plugin.settings.mhtmlSupport )
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.mhtmlSupport = enabled;
						await this.plugin.saveSettings();
					});
			});

		// ----- General Settings: Save Form State -----
		const saveFormStateSetting = new Setting(containerEl);
		saveFormStateSetting
			.setName("Save Form State into HTML File")
			.setDesc("Persist values of inputs, sliders, checkboxes, textareas and selects into the HTML file itself (as a small JSON block before </body>), and restore them next time the file is opened. Works in all Operating Modes except High Restricted and Text. Only applies to plain .html/.htm files (not SingleFileZ or MHTML).")
			.addToggle( (toggle) => {
				toggle
					.setValue( this.plugin.settings.saveFormState )
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.saveFormState = enabled;
						await this.plugin.saveSettings();
					});
			});

		// ----- General Settings: Auto Reload On File Change -----
		const autoReloadSetting = new Setting(containerEl);
		autoReloadSetting
			.setName("Auto Reload On File Change")
			.setDesc("Reload the opened file automatically when it is modified outside of this view (by another app, a script, or vault sync). The scroll position is preserved. Writes made by the 'Save Form State into HTML File' feature do not trigger a reload.")
			.addToggle( (toggle) => {
				toggle
					.setValue( this.plugin.settings.autoReloadOnChange )
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.autoReloadOnChange = enabled;
						await this.plugin.saveSettings();
					});
			});

		// ----- General Settings: Block Link Clicks By Default -----
		const blockLinkSetting = new Setting(containerEl);
		blockLinkSetting
			.setName("Block link clicks by default")
			.setDesc("Intercept clicks on external links so they neither navigate nor trigger the page's tracking scripts. This is only the initial value — each page can override it via the more-options menu (Cmd/Ctrl+click always opens the link).")
			.addToggle( (toggle) => {
				toggle
					.setValue( this.plugin.settings.blockLinkClick )
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.blockLinkClick = enabled;
						await this.plugin.saveSettings();
					});
			});

		// ----- HotKeys and Touch Gestures -----
		new Setting( containerEl ).setName( 'Hotkeys and touch gestures' ).setHeading();
		containerEl.createEl('small', { text: `Almost all keyboard hotkeys are taken from Obsidian's global hotkey settings, so you shall modify them via ⚙"Settings" ⇨ "Hotkeys" options page.` });

		this.buildHotkeySettings();

		new Setting(containerEl)
			.setName( 'Quick document zoom in and out' )
			.setDesc( 'Zoom the document using Ctrl + Wheel (zoom in: ↑, zoom out: ↓), or using the trackpad/touch screen/touch panel two-finger pinch-zoom gesture (zoom in: ← →, zoom out: → ←).' )
			.addToggle( (toggle) => {
				toggle
					.setValue(this.plugin.settings.zoomByWheelAndGesture)
					.onChange( async (enabled: boolean) => {
						this.plugin.settings.zoomByWheelAndGesture = enabled;
						await this.plugin.saveSettings();
					});
			});

	}

	buildHotkeySettings(): void {
		const { containerEl } = this;
		const appAny = this.app as App & { hotkeyManager?: any; isMobile?: boolean };
		const getHotkeysSafe = (commandId: string): any[] => {
			const manager = appAny.hotkeyManager;
			if (!manager)
				return [];
			return manager.getHotkeys?.(commandId) || manager.getDefaultHotkeys?.(commandId) || [];
		};

		// default hotkeys: app.commands.commands app.hotkeyManager.defaultKeys
		// custom hotkeys: app.hotkeyManager.customKeys

		let gSearch = getHotkeysSafe('editor:open-search');
		const hkSearch = new Setting(containerEl);
		hkSearch
			.setName( "Search document text" )
			.setDesc( `Search current file.` );

		let hotkeyPairs = [
			{ elm: hkSearch, settings: gSearch }
		];

		if( !appAny.isMobile ) {
			// following Hotkey settings would not appear on Mobile platforms!!

			let gZoomIn = getHotkeysSafe('window:zoom-in');
			const hkZoomIn = new Setting(containerEl)
								.setName( "Zoom in document" )
								.setDesc( `Zoom in current file.` );
			hotkeyPairs.push( { elm: hkZoomIn, settings: gZoomIn } );

			let gZoomOut = getHotkeysSafe('window:zoom-out');
			const hkZoomOut = new Setting(containerEl)
								.setName( "Zoom out document" )
								.setDesc( `Zoom out current file.` );
			hotkeyPairs.push( { elm: hkZoomOut, settings: gZoomOut } );

			let gZoomReset = getHotkeysSafe('window:reset-zoom');
			const hkZoomReset = new Setting(containerEl)
								.setName( "Reset document zoom" )
								.setDesc( `Reset current file zoom.` );
			hotkeyPairs.push( { elm: hkZoomReset, settings: gZoomReset } );
		}

		for( let pair of hotkeyPairs ) {
			if( pair.settings && pair.settings.length > 0 ) {
				for( let i = 0; i < pair.settings.length; ++i ) {
					if( i >= 2 ) {
						// only show first two hotkeys
						let eps = pair.elm.controlEl.createSpan();
						eps.textContent = '...';
						break;
					}

					let hk = pair.settings[i];
					pair.elm.addButton( (btn) => {
						if( hk.modifiers && hk.modifiers.length > 0 )
							btn.setButtonText( `${this.toNativeModifierString(hk.modifiers, hk.key)}` );
						else
							btn.setButtonText( `${hk.key}` );
						btn.setDisabled( true );
					});
				}
			} else {
				pair.elm.addButton( (btn) => {
					btn.setButtonText( `Blank` );
					btn.setDisabled( true );
				});
			}
		}

	}

	toNativeModifierString( modifiers: Modifier[], key: string ): string {
		if( isMacPlatform() || isIosPlatform() ) {
			return modifiers.join('')
					.replace( 'Mod', '⌘' ).replace( 'Meta', '⌘' )
					.replace( 'Shift', '⇧' ).replace( 'Alt', '⌥' )
					.replace( 'Ctrl', '^' ).concat( key );
		} else {
			return modifiers.join( ' + ' ).replace( 'Mod', 'Ctrl' ).replace( 'Meta', 'Win' ).concat( ` + ${key}` );
		}
	}
}

// Platform detection via the official Platform API (store requirement:
// obsidianmd/platform — navigator.userAgent/platform sniffing is not allowed)
export function isMacPlatform(): boolean {
	return Platform.isMacOS;
}
export function isIosPlatform(): boolean {
	return Platform.isIosApp || Platform.isPhone || Platform.isTablet;
}
