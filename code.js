// ------------------------------
// Show UI
// ------------------------------
figma.showUI(__html__, { width: 300, height: 360 });


// ------------------------------
// Load saved settings
// ------------------------------
figma.clientStorage.getAsync('lastSettings').then((settings) => {
  figma.ui.postMessage({
    type: 'loadSettings',
    settings: settings || {}
  });
});

// ------------------------------
// Selection counter (fixes "stuck state")
// ------------------------------
function sendSelectionCount() {
  const count = figma.currentPage.selection.filter(
    node => node.type === 'TEXT'
  ).length;

  figma.ui.postMessage({
    type: 'selectionCount',
    count
  });
}

// ------------------------------
// Get global coordinates
// ------------------------------
function getGlobalPosition(node) {
  const t = node.absoluteTransform;
  return {
    x: t[0][2],
    y: t[1][2]
  };
}

// Initial count
sendSelectionCount();

// Update count on selection change
figma.on('selectionchange', sendSelectionCount);

// ------------------------------
// Helpers
// ------------------------------
function parseRows(data, ignoreFirstLine, insertEmptyLines) {
  let rows = data.split('\n');

  if (ignoreFirstLine) {
    rows = rows.slice(1);
  }

  if (!insertEmptyLines) {
    rows = rows.filter(row => row.trim() !== '');
  }

  return rows;
}

// Handle messages from the UI
figma.ui.onmessage = async function (msg) {
  try {
    if (msg.type === 'cancel') {
      figma.closePlugin();
      return;
    }

    if (msg.type !== 'insert') return;

    const {
      data,
      ignoreFirstLine,
      insertEmptyLines,
      loopData,
      randomize
    } = msg;

    // ------------------------------
    // Parse rows (same logic as UI)
    // ------------------------------
    let rows = parseRows(data, ignoreFirstLine, insertEmptyLines);

     // ------------------------------
    // Save settings
    // ------------------------------
    await figma.clientStorage.setAsync('lastSettings', {
      ignoreFirstLine,
      insertEmptyLines,
      loopData,
      randomize
    });

    // ------------------------------
    // Get selected TEXT nodes (fresh, no cache)
    // ------------------------------
    const textNodes = figma.currentPage.selection
    .filter(node => node.type === 'TEXT')
    .sort((a, b) => {
      const aPos = getGlobalPosition(a);
      const bPos = getGlobalPosition(b);

      if (aPos.y === bPos.y) {
        return aPos.x - bPos.x;
      }
      return aPos.y - bPos.y;
    });
    
    // ------------------------------
    // Validation
    // ------------------------------
    if (rows.length === 0) {
      figma.notify('No data to insert.');
      return;
    }

    if (textNodes.length === 0) {
      figma.notify('No text layers selected.');
      return;
    }

    if (textNodes.length > rows.length && !loopData) {
      figma.notify('More text layers than rows to insert and no loop enabled.');
      return;
    }

    // ------------------------------
    // Randomize rows (optional)
    // ------------------------------
    if (randomize) {
      rows = [...rows].sort(() => Math.random() - 0.5);
    }

    // ------------------------------
    // Insert text
    // ------------------------------
    for (let i = 0; i < textNodes.length; i++) {
      if (i >= rows.length && !loopData) {
        break;
      }

      const node = textNodes[i];
      const text = rows[i % rows.length];

      // Load font
      if (node.hasMissingFont) {
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
        node.fontName = { family: 'Roboto', style: 'Regular' };
      } else {
        await figma.loadFontAsync(node.fontName);
      }

      node.characters = text;
    }

    figma.closePlugin();
  } catch (error) {
    console.error(error);
    figma.notify('Oops, something went wrong.');
  }
};