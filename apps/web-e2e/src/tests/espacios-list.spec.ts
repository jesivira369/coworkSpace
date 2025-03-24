import { test, expect } from '@playwright/test';

test.describe('Lista de espacios', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/espacios', async (route) => {
      const mockEspacios = [
        {
          id: 1,
          nombre: 'Sala de reuniones',
          ubicacion: 'PB',
          capacidad: 20,
        },
        {
          id: 2,
          nombre: 'Oficina compartida',
          ubicacion: 'PISO_1',
          capacidad: 10,
        },
      ];
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockEspacios),
      });
    });
  });

  test('debería mostrar la lista de espacios disponibles', async ({ page }) => {
    await page.goto('/espacios');

    await expect(page.getByText('Sala de reuniones')).toBeVisible();
    await expect(page.getByText('Oficina compartida')).toBeVisible();

    await expect(page.getByText('Planta Baja')).toBeVisible();
    await expect(page.getByText('PISO 1')).toBeVisible();

    await expect(page.getByText(/personas/)).toHaveCount(2);
  });
});
