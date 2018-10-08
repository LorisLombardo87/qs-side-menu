# QS Side Menu
> a filters menu

## Purpose and Description

Add a side menù with filters to qlik sense self service apps.

Reduce the space needed from filters in the page.

Manage your filters in the master libary and see the magic.


Mobile not supported!

## Screenshot

<img src = "http://10.0.61.204/horsabi/qs-side-menu/raw/master/asset/demo/cast2.gif" />


## Installation

1. Download the latest version from [here](https://github.com/LorisLombardo87/qs-side-menu/blob/master/build/qssidemenu_latest.zip?raw=true) 
2. Qlik Sense Desktop
	* To install, copy all files in the .zip file to folder "C:\Users\[%Username%]\Documents\Qlik\Sense\Extensions\QSSideMenu"
3. Qlik Sense Server
	* See instructions [how to import an extension on Qlik Sense Server](http://help.qlik.com/en-US/sense/June2017/Subsystems/ManagementConsole/Content/import-extensions.htm)

## Configuration

1. Add a filter panel to the master item, set the name and the tag for the item.
<img src = "http://10.0.61.204/horsabi/qs-side-menu/raw/master/asset/demo/cast3.gif">

2. define filter groups in extension's property panel.
<img src = "http://10.0.61.204/horsabi/qs-side-menu/raw/master/asset/demo/cast4.gif">

Each group as a title and a list of associated master items.

Every filter panel with that tag will be placed in the side menu, under its group title.

## Contributing
Contributing to this project is welcome. The process to do so is outlined below:

1. Create a fork of the project
2. Work on whatever bug or feature you wish
3. Create a pull request (PR)

We cannot guarantee that we will merge all PRs but we will evaluate them all.

## Authors

**Loris Lombardo** 

**Cristian Dal Santo**

## Change Log

See [CHANGELOG](CHANGELOG.yml)

## License & Copyright
The software is made available "AS IS" without any warranty of any kind under the MIT License (MIT).

See [Additional license information for this solution.](LICENSE.md)




