const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const GITHUB_SETTINGS_SCHEMA = 'org.gnome.shell.extensions.github.notifications';

const TOKEN_EXPLAINER = 'To get your token, please visit <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a>\n' +
						' - Select "Generate new token"\n' +
						' - Pick any name you fancy (Gnome desktop notifications)\n' +
						' - Select the "Notifications" scope\n' +
						' - Click on "Generate Token"\n' +
						' - Copy and paste the token in the above field\n\n' +
						'* This refresh interval will be ignored if smaller than github\'s policy.\n' +
						'See <a href="https://developer.github.com/v3/activity/notifications/">https://developer.github.com/v3/activity/notifications</a>';

function buildPrefsWidget() {
	const settings = Convenience.getSettings(GITHUB_SETTINGS_SCHEMA);

	const box = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL, spacing: 5});

	const hideWidgetBox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 5});
	const hideWidgetLabel = new Gtk.Label ({label : "Hide widget when there are no notifications"});
	hideWidgetBox.pack_start(hideWidgetLabel, false, false, 5);
	const hideWidgetSwitch = new Gtk.Switch();
	settings.bind('hide-widget', hideWidgetSwitch, 'state', Gio.SettingsBindFlags.DEFAULT);
	hideWidgetBox.pack_end(hideWidgetSwitch, false, false, 5);
	box.pack_start(hideWidgetBox, false, false, 5);

	const hideCount = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 5});
	const hideCountLabel = new Gtk.Label ({label : "Hide notification count"});
	hideCount.pack_start(hideCountLabel, false, false, 5);
	const hideCountSwitch = new Gtk.Switch();
	settings.bind('hide-notification-count', hideCountSwitch, 'value', Gio.SettingsBindFlags.DEFAULT);
	hideCount.pack_end(hideCountSwitch, false, false, 5);
	box.pack_start(hideCount, false, false, 5);

	const refreshInterval = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 5});
	const refreshIntervalLabel = new Gtk.Label ({label : "Refresh interval (in seconds)*"});
	refreshInterval.pack_start(refreshIntervalLabel, false, false, 5);
	const refreshIntervalSpinButton = Gtk.SpinButton.new_with_range (60, 86400, 1);
	settings.bind('refresh-interval', refreshIntervalSpinButton, 'value', Gio.SettingsBindFlags.DEFAULT);
	refreshInterval.pack_end(refreshIntervalSpinButton, false, false, 5);
	box.pack_start(refreshInterval, false, false, 5);
	
	const handleBox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 5});
	const handleLabel = new Gtk.Label ({label : "Github handle"});
	handleBox.pack_start(handleLabel, false, false, 5);
	const handleEntry = new Gtk.Entry();
	settings.bind('handle', handleEntry, 'text', Gio.SettingsBindFlags.DEFAULT);
	handleBox.pack_end(handleEntry, true, true, 5);
	box.pack_start(handleBox, false, false, 5);

	const tokenBox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 5});
	const tokenLabel = new Gtk.Label ({label : "Github Token"});
	tokenBox.pack_start(tokenLabel, false, false, 5);
	const tokenEntry = new Gtk.Entry();
	settings.bind('token', tokenEntry, 'text', Gio.SettingsBindFlags.DEFAULT);
	tokenBox.pack_end(tokenEntry, true, true, 5);
	box.pack_start(tokenBox, false, false, 5);

	const explainerLabel = new Gtk.Label({label : TOKEN_EXPLAINER, selectable: true, 'use-markup': true});
	box.pack_end(explainerLabel, false, false, 5);

	box.show_all();
	return box;
}

function init() {
}