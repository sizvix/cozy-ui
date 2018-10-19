A menu to display choices to the user.

Pass data to the `MenuItem`s and use `onSelect` to handle user selecting
an item in the `Menu`.

`MenuItem`s can also have their own `onSelect`, in this case, the global
`onSelect` will not be called. `MenuItem`s `onSelect` is not called if
the item is `disabled`.

```
const { MenuItem } = require('.');
const Button = require('../Button').default;
const showItem = itemData => alert(JSON.stringify(itemData));
const showWarning = itemData => alert(itemData + ' is disabled');

<Menu text='Click me !' onSelect={ showItem } onSelectDisabled={ showWarning }>
  <MenuItem data='hello'>Hello !</MenuItem>
  <MenuItem disabled data='bonjour'>Bonjour !</MenuItem>
  <hr />
  <MenuItem icon={<Icon icon='paperplane'/>} onSelect={x => alert('You clicked hola')} data='hola'>¡Hola!</MenuItem>
</Menu>
```

Use the `position` attribute to put the menu to the right.

```
const { MenuItem } = require('.');
const { Icon } = require('../Icon');

<Menu position='right' text='Click me !' onSelect={ itemData => alert(JSON.stringify(itemData)) }>
  <MenuItem data='hello'>Hello !</MenuItem>
  <MenuItem disabled data='bonjour'>Bonjour !</MenuItem>
  <MenuItem data='hola'>¡Hola!</MenuItem>
</Menu>
```

Use the `component` attribute if you want to use a custom component for the
opener.

```
const { MenuItem } = require('.');
const { Button } = require('../Button');

<Menu component={<Button>Greetings with custom component</Button>} onSelect={ itemData => alert(JSON.stringify(itemData)) }>
  <MenuItem data='hello'>Hello !</MenuItem>
  <MenuItem disabled data='bonjour'>Bonjour !</MenuItem>
  <MenuItem data='hola'>¡Hola!</MenuItem>
</Menu>
```

`MenuItemLegend` and `MenuItemImg` are exported for you to build custom menu items.

```
const { Media, Bd, Img } = require('../Media')
const { MenuItemImg, MenuItem, MenuItemLegend } = require('.')
const Icon = require('../Icon').default;

const CustomMenuItem = ({ icon, legend, text, ...rest }) => {
  return (
    <MenuItem {...rest}>
      <Media align='top'>
        <MenuItemImg icon={<Icon icon={ icon } />} />
        <Bd>
          <div>{ text }</div>
          <MenuItemLegend>
            { legend }
          </MenuItemLegend>
        </Bd>
      </Media>
    </MenuItem>
  )
}

<Menu text='Click Me !'>
  <CustomMenuItem onSelect={() => alert('Do not touch anything !')} icon='back' text='Go back' legend='in time...' />
  <CustomMenuItem onSelect={() => alert('Don\'t forget your almanac')} icon='forward' text='Go back' legend='to the future...' />
</Menu>
```
