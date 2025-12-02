// menu-items.js

// Menu configuration for default layout
const menuItems = {
  items: [
    // =====================================================
    // 1. NAVIGATION
    // =====================================================
    {
      id: 'dashboard',
      title: 'Dashboard',
      subtitle: '',
      type: 'item',
      icon: 'remixicon',
      iconname: 'ri-dashboard-line',
      url: '/admin/dashboard'
    },

    // =====================================================
    // 2. UTILISATEURS
    // =====================================================
    {
      id: 'users',
      title: 'Utilisateurs',
      subtitle: 'Gestion des utilisateurs',
      type: 'collapse',
      icon: 'remixicon',
      iconname: 'ri-user-line',
      children: [
        {
          id: 'users-list',
          title: 'Liste des utilisateurs',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-list-check',
          url: '/admin/users'
        },
        {
          id: 'teams',
          title: 'Équipes',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-team-line',
          url: '/admin/teams'
        },
        {
          id: 'roles',
          title: 'Rôles & Permissions',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-shield-keyhole-line',
          url: '/admin/roles'
        }
      ]
    },

    // =====================================================
    // 3. PRODUITS & STOCK
    // =====================================================
    {
      id: 'products',
      title: 'Produits et Stock',
      subtitle: 'Gestion des produits',
      type: 'collapse',
      icon: 'remixicon',
      iconname: 'ri-store-2-line',
      children: [
        {
          id: 'products-list',
          title: 'Liste des produits',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-list-unordered',
          url: '/admin/products'
        },
        {
          id: 'stock-in',
          title: 'Entrées de stock',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-arrow-right-up-line',
          url: '/admin/stock/in'
        },
        {
          id: 'stock-out',
          title: 'Sorties de stock',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-arrow-right-down-line',
          url: '/admin/stock/out'
        },
        {
          id: 'suppliers',
          title: 'Fournisseurs',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-truck-line',
          url: '/admin/suppliers'
        }
      ]
    },

    // =====================================================
    // 4. COMMANDES
    // =====================================================
    {
      id: 'orders',
      title: 'Commandes et Paiements',
      subtitle: 'Suivi des commandes',
      type: 'collapse',
      icon: 'remixicon',
      iconname: 'ri-shopping-cart-2-line',
      children: [
        {
          id: 'orders-list',
          title: 'Toutes les commandes',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-receipt-line',
          url: '/admin/orders'
        },
        {
          id: 'payments',
          title: 'Paiements',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-bank-card-line',
          url: '/admin/payments'
        },
        {
          id: 'transactions',
          title: 'Transactions',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-exchange-dollar-line',
          url: '/admin/transactions'
        }
      ]
    },

    // =====================================================
    // 5. MARKETING
    // =====================================================
    {
      id: 'coupons',
      title: 'Marketing',
      subtitle: 'Outils marketing',
      type: 'collapse',
      icon: 'remixicon',
      iconname: 'ri-megaphone-line',
      children: [
        {
          id: 'coupons-list',
          title: 'Liste des coupons',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-coupon-line',
          url: '/admin/coupons'
        },
        {
          id: 'coupon-usages',
          title: 'Utilisation des coupons',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-history-line',
          url: '/admin/coupons/usages'
        }
      ]
    },

    // =====================================================
    // 6. SYSTÈME
    // =====================================================
    {
      id: 'system',
      title: 'Système',
      subtitle: 'Paramètres système',
      type: 'collapse',
      icon: 'remixicon',
      iconname: 'ri-settings-3-line',
      children: [
        {
          id: 'settings',
          title: 'Paramètres',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-tools-line',
          url: '/admin/settings'
        },
        {
          id: 'audit-logs',
          title: 'Audit Logs',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-file-search-line',
          url: '/admin/audit-logs'
        },
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: '',
          type: 'item',
          icon: 'remixicon',
          iconname: 'ri-notification-3-line',
          url: '/admin/notifications'
        }
      ]
    }
  ]
};

export default menuItems;
